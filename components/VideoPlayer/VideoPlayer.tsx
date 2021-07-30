import React, {useRef} from 'react';
import {
    View,
    Text,
} from 'react-native';
import {Video} from 'expo-av'

type VideoPlayerProps = {
    videoURI: string;
    thumbnailURI: string;
}

const VideoPlayer = (props:VideoPlayerProps) => {
    const {videoURI, thumbnailURI} = props;

    const onRefAssign = (videoElement: Video)=>{
        console.warn("Video is mounted")
        const source = {uri: videoURI};

    }

    return (
        <View>
            <Video
                source={{uri: videoURI}}
                posterSource={{uri:thumbnailURI}}
                posterStyle={{resizeMode:'cover'}}
                usePoster={false}
                resizeMode='contain'
                useNativeControls
                style={{width:'100%', aspectRatio: 16/9}}
            />
        </View>
    );
};

export default VideoPlayer;