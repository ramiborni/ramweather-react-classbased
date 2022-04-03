import {Component} from 'react';
import {ResponseWeatherData} from "../../model/ResponseWeatherData";

type ResultProps = {
    result: ResponseWeatherData;
};
type ResultState = {
};

class Result extends Component<ResultProps,ResultState> {


    dateBuilder = () => {
        const d = new Date();
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    render() {
        const {result} = this.props;
        return (
            <div className="flex flex-col justify-center items-center text-center gap-y-8 mt-8">
               <div  className="flex flex-col gap-y-2">
                   <h1 className="text-6xl font-bold">{result.name}, {result.sys!.country}</h1>
                   <h2 className="text-2xl font-bold">{this.dateBuilder()}</h2>
               </div>
                <div className="bg-white/50 py-8 px-14 w-[250px] font-bold text-6xl rounded-xl">
                    {result.main!.temp?.toFixed()}&deg;C
                </div>
                <div className="text-4xl">
                    {result.weather![0].main}
                </div>
            </div>
        );
    }
}

export default Result;