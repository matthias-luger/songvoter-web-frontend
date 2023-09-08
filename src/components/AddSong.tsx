import { useRef, useState } from 'react'
import { getListController, getSongController } from '../utils/ApiUtils'
import { IconButton, TextField } from '@mui/material'
import { getLoadingElement } from '@/utils/LoadingUtils'
import { CoflnetSongVoterModelsSong } from '../../generated'
import { toast } from 'react-toastify'
import AddIcon from '@mui/icons-material/Add'
import SongListElement from './SongListElement'

interface Props {
    playlistId?: string
    onAfterSongAdded(song: CoflnetSongVoterModelsSong): any
}

interface SongListItem extends CoflnetSongVoterModelsSong {
    addingState?: 'adding' | 'added'
}

export default function AddSong(props: Props) {
    let [results, setResults] = useState<SongListItem[]>([])
    let [isLoading, setIsLoading] = useState<boolean>()
    let [showLongLoadingText, setShowLongLoadingText] = useState(false)
    let searchTextRef = useRef('')

    let resultsRef = useRef(results)
    resultsRef.current = results

    function debounce(func: Function, delay: number) {
        let timeout: NodeJS.Timeout

        return function (...args: any) {
            clearTimeout(timeout)

            timeout = setTimeout(() => {
                // @ts-ignore
                func.apply(this, args)
            }, delay)
        }
    }

    async function search(searchText: string) {
        if (!searchText) {
            return
        }
        searchTextRef.current = searchText
        let timeout
        try {
            setIsLoading(true)
            setResults([])

            timeout = setTimeout(() => {
                setShowLongLoadingText(true)
            }, 3000)

            let controller = await getSongController()
            let results = await controller.songsSearchGet({
                term: searchText,
                platforms: 'spotify'
            })
            if (searchText !== searchTextRef.current) {
                return
            }
            setResults(results)
        } catch (e) {
            console.error(e)
        } finally {
            clearTimeout(timeout)
            setIsLoading(false)
            setShowLongLoadingText(false)
        }
    }

    async function onAddSong(song: SongListItem) {
        let songs = [...results]
        let s = songs.find(s => s.id === song.id)
        if (s) {
            s.addingState = 'adding'
        }
        setResults(songs)
        if (props.playlistId) {
            let listController = await getListController()
            await listController.listsListIdSongsPost({
                listId: props.playlistId,
                coflnetSongVoterModelsSongId: {
                    id: song.id
                }
            })
        }
        toast.success('Song added')
        if (props.onAfterSongAdded) {
            props.onAfterSongAdded(song)
        }
        let newResults = [...resultsRef.current]
        s = resultsRef.current.find(s => s.id === song.id)
        if (s) {
            s.addingState = 'added'
        }
        setResults(newResults)
    }

    let searchFunction = debounce(search, 500)

    return (
        <>
            <TextField
                style={{ marginTop: 10 }}
                label="Search song..."
                variant="outlined"
                onChange={e => {
                    searchFunction(e.target.value)
                }}
                autoFocus
            />
            {
                <div style={{ overflowY: 'auto', maxHeight: '80vh' }}>
                    {isLoading
                        ? getLoadingElement(
                              showLongLoadingText ? (
                                  <>
                                      <p>Fetching new song information.</p>
                                      <p>Search might take a bit longer...</p>
                                  </>
                              ) : (
                                  <></>
                              )
                          )
                        : results.map(result => (
                              <SongListElement
                                  key={result.id}
                                  song={result}
                                  clickElement={
                                      !result.addingState ? (
                                          <IconButton size="small" onClick={() => onAddSong(result)}>
                                              <AddIcon color="success" />
                                          </IconButton>
                                      ) : result.addingState === 'adding' ? (
                                          getLoadingElement(<p>Loading songs...</p>)
                                      ) : null
                                  }
                              />
                          ))}
                </div>
            }
        </>
    )
}
