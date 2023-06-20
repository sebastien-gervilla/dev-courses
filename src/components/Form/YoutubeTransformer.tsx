import React, { useState } from 'react';
import { CopyableField } from '..';
import { FormField } from '../FormField';

const YoutubeTransformer = () => {

    const [links, setLinks] = useState(defaultLinks);

    const handleChangeLink = (name: string, value: string) =>
        setLinks({...links, [name]: value});

    const handleTransformLink = () => {
        if (!links.raw) return;

        const matches = links.raw.match(transformerRegex);
        if (!matches?.length) return;
        if (matches.length < 2) return;

        const youtubeLink = baseEmbedUrl + matches[1];

        setLinks({
            raw: '',
            transformed: `<iframe src="${youtubeLink}"></iframe>`
        });
    }

    return (
        <div className='youtube-transformer'>
            <h3>Générer un embed</h3>
            <FormField 
                label='Lien youtube'
                name="raw"
                value={links.raw}
                onChange={handleChangeLink}
            />
            <button
                className="animated filled"
                onClick={handleTransformLink}
            >
                Transformer
            </button>
            <CopyableField 
                text={links.transformed}
            />
        </div>
    );
};

type Links = {
    raw: string
    transformed: string
}

const defaultLinks: Links = {
    raw: '',
    transformed: ''
}

const baseEmbedUrl = "https://www.youtube.com/embed/";
const transformerRegex = /(?:\?v=|\/embed\/|\/\d\/|\/vi\/|\/v\/|https?:\/\/(?:www\.)?youtube.com\/user\/\S+|https?:\/\/(?:www\.)?youtu\.be\/)([^#\&\?]{11})/;

export default YoutubeTransformer;