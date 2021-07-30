import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList
}
from 'react-native'
import { DataStore } from 'aws-amplify';
import {Video} from '../src/models'

import VideoListItem from '../components/VideoListItem';
//import videos from '../assets/data/videos.json'

const HomeScreen = () => {

    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(()=>{
        const fetchVideos = async()=>{
            const response = await DataStore.query(Video);
            //console.log(response);
            setVideos(response);
        };

        fetchVideos();
    }, [])

    return (
        <View>
            <FlatList
                data={videos}
                renderItem={({item}) => (
                    <VideoListItem video={item}/>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
})

export default HomeScreen;