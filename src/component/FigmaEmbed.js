import React from 'react';

export default function FigmaEmbed() {
    return (
        <div style={{ width: '100%', height: window.innerHeight }}>

            <iframe style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                width="100%" height="100%"
                src='https://www.figma.com/file/Lc4GAtpwcHlf2nJnTFS17o?embed_host=share&kind=file&node-id=24-2&page-selector=0&viewer=1'
                allowFullScreen>

            </iframe>
        </div>
    );
}
