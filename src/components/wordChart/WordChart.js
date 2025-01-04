import chartDataMaker from './lib/charDateMaker';
import chartOption from './lib/chartOption';
import { Bar } from 'react-chartjs-2';

function WordChart({ words }) {
  const chartData = chartDataMaker(words);
  const options = chartOption;
  return (
    <div className="mt-3 py-3" id="statics">
      <span className="fw-bolder fs-4 m-0">통계</span>
      <div className="maxWidth m-auto">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default WordChart;
