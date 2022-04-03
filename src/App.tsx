import React, {Component} from 'react';
import styled from "styled-components";
import "./App.css";
import Form from "./Form";
import {ResponseWeatherData} from "../model/ResponseWeatherData";
import Result from './Components/Result';


type AppProps = {}
type AppState = {
    city: string,
    resultCode: number,
    resultBody: ResponseWeatherData
}
const api = {
    key: "d6c20e930e86f01e574bca2b733f8079",
    base: "https://api.openweathermap.org/data/2.5/"
}

class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            city: "",
            resultBody: {
            },
        };
    }

    componentDidUpdate(prevProps: Readonly<AppProps>, prevState: Readonly<AppState>, snapshot?: any) {
        if (prevState.city !== this.state.city) {
            this.getCityData(this.state.city);
        }
    }

    getCityData(city: string) {
        fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(res => {
                if (res.cod === 200) {
                    this.setState({
                        resultBody: res
                    })
                } else {
                    this.setState({
                        resultBody: res
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    setCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            city: event.target.value,
        });
    };

    render() {
        const {city, resultBody}  =  this.state as {city: string, resultBody: ResponseWeatherData};

        const MainWarm = styled.main`
          background: url("/bg/warm-bg.jpg") no-repeat center center fixed;
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
          height: 100vh;
        `
        const MainCold = styled.main`
          background: url("/bg/cold-bg.jpg") no-repeat center center fixed;
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;
          height: 100vh;
        `

        const MainBody = () => <>

            <h1 className="title lg:text-6xl text-2xl"> RamWeather App</h1>
            <Form city={city} setCity={this.setCity} result={resultBody.cod}/>
            {resultBody!.cod === 200 && <Result result={resultBody}/>}
        </>

        return (
            (!resultBody.main || (resultBody.main.temp! <= 25)) ?
                <MainCold className="pt-12 flex flex-col text-center gap-y-8">
                    <MainBody/>
                </MainCold>
                : <MainWarm className="pt-12 flex flex-col text-center gap-y-8">
                    <MainBody/>
                </MainWarm>
        );
    }
}

export default App;
