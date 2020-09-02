import React from 'react';
import '../styles/Sidebar.css'
import SidebarOption from './SidebarOption'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import {useStateProviderValue} from '../StateProvider'

function Sidebar() {
    let [{playlists}, dispatch] = useStateProviderValue()

    return (
        <div className="sidebar">
            <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="" className="sidebar_logo"></img>
            <SidebarOption title="Home" Icon={HomeIcon}/>
            <SidebarOption title="Search" Icon={SearchIcon}/>
            <SidebarOption title="Your Library" Icon={LibraryMusicIcon}/>
            <br/>
            <strong className="sidebar_title">PLAYLISTS</strong>
            <hr/>
            {/* use optional chaining to protect app from crashing in event playlist is null */}
            {playlists?.items?.map(playlist => {
                return <SidebarOption title={playlist.name}/>
            })}
        </div>
    )
}

export default Sidebar