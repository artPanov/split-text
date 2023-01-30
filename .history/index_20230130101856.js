const MAX_TEXT_SIZE = 140;
const MAX_CHUNKS_SIZE = 9999;
const TEXT = 'Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut suscipit velit efficitur eget Sed sit amet posuere risus';

function splitTex(text, maxTextSize, maxChunksSize) {
    const words = text.split(' ');
    let chunks = [];
    let chunksCount = 0;
    let chunkIndex = 1;
    let wordIndex = 0;

    if (text.length <= maxTextSize) {
        return text;
    }

    if (words.some((word) => word.length > maxTextSize)) {
        throw new Error(`Some of word's length is more than ${maxTextSize}`);
    }

    chunksCount = calculateChunks(words, maxTextSize);

    if (chunksCount > maxChunksSize) {
        throw new Error(`Text is too long, chunks length is ${chunksCount}`);
    }

    let tpmText = '';

    while (true) {
        if (wordIndex === words.length) {
            chunks.push(createChunk(tpmText, chunkIndex, chunksCount));
            return chunks;
        }

        if (words[wordIndex].length > maxTextSize) {
            throw new Error(`Word '${words[wordIndex]} is too long, it's length is ${words[wordIndex].length}`)
        }

        if (createChunk(tpmText + words[wordIndex], chunkIndex, chunksCount).length < maxTextSize) {
            tpmText += words[wordIndex] + ' ';
            ++wordIndex;
            continue;
        }

        chunks.push(createChunk(tpmText, chunkIndex, chunksCount));
        tpmText = '';
        ++chunkIndex;
    }

}

function calculateChunks(words, maxTextSize) {
    let wordIndex = 0;
    let chunkIndex = 1;
    let chunksCount = 1;

    while (true) {
        let tempText = '';
        wordIndex = 0;
        chunkIndex = 1;

        while (true) {
            if (chunksCount.toString().length < chunkIndex.toString().length) {
                chunksCount = chunkIndex;
                break;
            }

            if (wordIndex === words.length) {
                return chunkIndex;
            }

            if (createChunk(tempText + words[wordIndex], chunkIndex, chunksCount).length < maxTextSize) {
                tempText += words[wordIndex] + ' ';
                ++wordIndex;
                continue;
            }

            tempText = '';
            ++chunkIndex;
        }
    }
}

function createChunk(text, chunkIndex, chunksCount) {
    return `${text}${chunkIndex}/${chunksCount}`;
}

console.log(splitTex(TEXT, MAX_TEXT_SIZE, MAX_CHUNKS_SIZE));