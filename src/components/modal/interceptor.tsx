'use client'

import { ExternalLink, Heart, MoreHorizontal, Pause, Play } from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const song = {
  album: 'Album Name',
  title: 'Song Title',
  artist: 'Artist Name',
  releaseDate: '2023',
  tracks: [],
  duration: '3:45',
  imageUrl: '/bart-simpson-cartoon.png',
  explicit: true,
  popularity: 75,
}
function ProjectInterceptorPage() {
  const router = useRouter()
  const isPlaying = false

  const handleClose = () => {
    router.back()
  }

  return (
    <Dialog
      defaultOpen={true} onOpenChange={handleClose}>
      <DialogContent
        className='min-w-4/5 min-h-4/5 z-50 flex items-center justify-center p-4 backdrop-blur-sm
        '
        style={{
          background: "linear-gradient(to bottom, rgba(91, 33, 182, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)",
        }}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div
          className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-xl shadow-2xl animate-fadeIn"
        >

          <div className="flex flex-col md:flex-row h-full">
            {/* Left side - Album art and basic info */}
            <div className="md:w-1/2 p-8 flex flex-col items-center md:items-start">
              {/* Album artwork with reflection effect */}
              <div className="relative group">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden shadow-2xl">
                  <Image src={song.imageUrl || "/placeholder.svg"} alt={song.title} fill className="object-cover" />
                </div>
                <div className="absolute -bottom-20 w-64 md:w-80 h-20 opacity-30 blur-md scale-90 transform rotate-180">
                  <Image src={song.imageUrl || "/placeholder.svg"} alt="" fill className="object-cover" />
                </div>
              </div>

              {/* Song info */}
              <div className="mt-8 text-center md:text-left w-full">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10">
                    {song.album ? "ALBUM" : "SINGLE"}
                  </span>
                  {song.explicit && (
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-white/20 text-white">E</span>
                  )}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 line-clamp-2">{song.title}</h2>
                <p className="text-white/80 text-sm mb-4">
                  <span className="font-medium text-white">{song.artist}</span> • {song.releaseDate || "2023"} •{" "}
                  {song.tracks?.length || 1} {song.tracks?.length === 1 ? "song" : "songs"}, {song.duration || "3:45"}
                </p>

                {/* Controls */}
                <div className="flex items-center gap-4 mt-4">
                  <button

                    className="w-14 h-14 flex items-center justify-center rounded-full bg-green-500 text-black hover:bg-green-400 shadow-lg transition-transform hover:scale-105"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right side - Tracks list */}
            <div className="md:w-1/2 bg-black/30 backdrop-blur-sm overflow-y-auto max-h-[50vh] md:max-h-[85vh]">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Tracks</h3>
                  <button className="flex items-center gap-1 text-xs text-white/70 hover:text-white">
                    <span>Open in player</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>

                {/* Track listing */}
                <div className="space-y-1">
                  LOL
                </div>

                {/* Popularity section */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h4 className="text-sm font-medium text-white mb-3">Popularity</h4>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-300"
                      style={{ width: `${song.popularity || 75}%` }}
                    ></div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/80">Pop</span>
                    <span className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/80">Electronic</span>
                    <span className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/80">Dance</span>
                  </div>
                </div>

                {/* Copyright info */}
                <div className="mt-8 pt-4 border-t border-white/10 text-xs text-white/50">
                  <p>
                    © {new Date().getFullYear()} {song.artist}
                  </p>
                  <p className="mt-1">℗ {new Date().getFullYear()} Spotify Records</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}

export { ProjectInterceptorPage }