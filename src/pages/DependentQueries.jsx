import React from 'react';
import axios from "axios";
import { useQuery } from 'react-query';

const fetchUserByEmailId = (email) => {
    return axios.get(`http://localhost:4000/users/${email}`);
}

const fetchVideosByChannelId = ({queryKey}) => {
    const channelId = queryKey[1];
    return axios.get(`http://localhost:4000/channels/${channelId}`);
}

function DependentQueries({email}) {
  const {data: user} = useQuery(["user",email],() => fetchUserByEmailId(email));
  const channelId = user?.data.channelId;
  const {data: channel} = useQuery(["channel",channelId],fetchVideosByChannelId,{
    enabled: !!channelId
  });
  
  return (
    <div>
        <h1>Dependent Queries</h1>
        <p><b>channel:</b> {channel?.data.id}</p>
        <ul>
            {
                channel?.data.videos.map(video => {
                    return <li key={video}>{video}</li>
                })
            }
        </ul>
    </div>
  )
}

export default DependentQueries