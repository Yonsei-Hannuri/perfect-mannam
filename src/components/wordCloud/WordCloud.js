import ReactWordcloud from 'react-wordcloud';
import wordCloudDataMaker from './lib/wordCloudDataMaker';

const WordCloud = ({ wordList }) => {
  return (
    <ReactWordcloud
      words={wordCloudDataMaker(wordList)}
      options={{ fontSizes: [12, 72] }}
    />
  );
};

export default WordCloud;
