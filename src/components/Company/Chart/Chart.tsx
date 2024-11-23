import { Line } from 'react-chartjs-2';
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    Filler
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface IPopulation {
  year: number;
  value: number;
}

interface IPopulationProps {
    population: IPopulation[]
}

export const ChartComponent = ({ population }: IPopulationProps) => {
    const years = population.map(({year}) => year);
    const values = population.map(({ value }) => value);
    
    const data = {
        labels: years,
        datasets: [
            {
                label: 'Population',
                data: values,
                borderColor: 'rgba(250, 5, 17, 0.2)',
                backgroundColor: 'rgba(12, 77, 77, 0.2)',
                borderWidth: 2,
                fill: true,
            },
        ],
    };
    
    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Population Growth',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Year',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Population',
                },
            },
        },
    };

    return (
        <Line data={data} options={options} />
    );
};
