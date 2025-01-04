import ReactWordcloud from 'react-wordcloud';
import generateWordCloudData from './lib/generateWordCloudData';

const WordCloud = ({ words }) => {
  return (
    <ReactWordcloud
      words={generateWordCloudData(words)}
      options={{ fontSizes: [12, 72] }}
    />
  );
};

export default WordCloud;
