import React, { useState, useEffect } from 'react';
import { Library } from './components/Library';
import { Reader } from './components/Reader';
import { processMangaFile, extractFirstPage } from './utils/zipUtils';
import { MangaItem, LibraryItem } from './types';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

const STORAGE_KEY = 'manga_library';
const MANGA_FOLDER = 'MyManga';

function App() {
  const [view, setView] = useState<'library' | 'reader'>('library');
  const [currentManga, setCurrentManga] = useState<MangaItem | null>(null);
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadLibrary();
  }, []);

  const loadLibrary = async () => {
    try {
      const { value } = await Preferences.get({ key: STORAGE_KEY });
      if (value) {
        setLibraryItems(JSON.parse(value));
      }
    } catch (err) {
      console.error("Failed to load library", err);
    }
  };

  const saveLibrary = async (items: LibraryItem[]) => {
    try {
      await Preferences.set({
        key: STORAGE_KEY,
        value: JSON.stringify(items)
      });
    } catch (err) {
      console.error("Failed to save library", err);
    }
  };

  const ensureMangaFolder = async () => {
    try {
      await Filesystem.mkdir({
        path: MANGA_FOLDER,
        directory: Directory.Documents,
        recursive: true
      });
    } catch (e) {
      // Folder likely already exists
    }
  };

  const handlePickFiles = async (files: { path: string, name: string }[]) => {
    setIsLoading(true);
    await ensureMangaFolder();
    
    const newItems: LibraryItem[] = [];
    
    for (const file of files) {
        if (!file.name.match(/\.(zip|cbz)$/i)) continue;

        try {
            const id = crypto.randomUUID();
            const extension = file.name.split('.').pop() || 'cbz';
            const fileName = `${id}.${extension}`;
            const internalPath = `${MANGA_FOLDER}/${fileName}`;
            
            // 1. Copy file to permanent Documents directory
            await Filesystem.copy({
                from: file.path,
                to: internalPath,
                toDirectory: Directory.Documents
            });
            
            // 2. Get permanent URI for the new file
            const uriResult = await Filesystem.getUri({
                path: internalPath,
                directory: Directory.Documents
            });
            
            // 3. Generate cover from the new path
            const coverUrl = await extractFirstPage(uriResult.uri);
            
            newItems.push({
                id,
                title: file.name.replace(/\.(zip|cbz)$/i, ''),
                path: uriResult.uri,
                coverUrl
            });
        } catch (err) {
            console.error("Failed to import manga:", file.name, err);
        }
    }
    
    if (newItems.length > 0) {
        const updated = [...libraryItems, ...newItems];
        setLibraryItems(updated);
        await saveLibrary(updated);
    }
    setIsLoading(false);
  };

  const handleDeleteManga = async (id: string) => {
      const item = libraryItems.find(i => i.id === id);
      if (!item) return;

      const confirmDelete = confirm(`Are you sure you want to delete "${item.title}"? This will remove the file from your device.`);
      if (!confirmDelete) return;

      try {
          // Delete file from internal storage
          await Filesystem.deleteFile({
              path: item.path
          });
      } catch (err) {
          console.warn("File deletion failed (it may have been missing), removing from list anyway.", err);
      }

      const updated = libraryItems.filter(i => i.id !== id);
      setLibraryItems(updated);
      await saveLibrary(updated);

      if (currentManga?.id === id) {
          setCurrentManga(null);
          setView('library');
      }
  };

  const handleSelectManga = async (id: string) => {
    if (currentManga && currentManga.id === id) {
        setView('reader');
        return;
    }

    const item = libraryItems.find(i => i.id === id);
    if (!item) {
        alert("Manga not found in library.");
        return;
    }

    setIsLoading(true);
    try {
        if (currentManga) {
            currentManga.pages.forEach(url => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        }

        const manga = await processMangaFile(item);
        setCurrentManga(manga);
        setView('reader');
    } catch (error) {
        console.error("Failed to process manga file", error);
        alert(`Failed to load manga. The file might have been moved or deleted.\n\n${error instanceof Error ? error.message : String(error)}`);
    } finally {
        setIsLoading(false);
    }
  };

  const handleCloseReader = () => {
    setView('library');
  };

  if (view === 'reader' && currentManga) {
    return <Reader manga={currentManga} onClose={handleCloseReader} />;
  }

  return (
    <>
      <Library 
        items={libraryItems} 
        onSelect={handleSelectManga} 
        onPickFiles={handlePickFiles}
        onDelete={handleDeleteManga}
      />
      
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
           <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="text-white font-medium animate-pulse">Processing Manga...</p>
           </div>
        </div>
      )}
    </>
  );
}

export default App;