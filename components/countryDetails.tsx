import React, { FormEvent, useCallback } from 'react';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { StyleSheet, Text, View, Button } from 'react-native';

type IntialProps = {
    name: string;

};

interface InitCountry {
    flags: {
        svg: string;
    };
    capital: string[];
    population: number;
    latlng: number[];
    
}
interface InitCountryWeatherInfo {
    temperature: number;
    weather_icons: string[];
    wind_speed: number;
    precip: number;
}

export const CountryDetails: React.FC = () => {
    const { name } = useParams<IntialProps>();
    const [countryInfo, setCountryInfo] = useState<InitCountry>();
    const [capitalName, setCapitalName] = useState('');
    const [weatherInfo, setWeatherInfo] = useState<InitCountryWeatherInfo>();
    const [countryApiError, setCountryApiError] = useState<Boolean>(false);
    const [weatherApiError, setWeatherApiError] = useState<Boolean>(false);
    const [loading, setLoading] = useState<Boolean>(false);
    const navigation = useNavigation();

    const getCountryData = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://restcountries.com/v3.1/name/${name}`
        );
        const data = response.data;
            setCountryInfo(data[0]);
            setCapitalName(data[0].capital[0]);
        } catch (error) {
            setCountryApiError(true);
        }
    }, [name]);

    useEffect(() => {
        getCountryData();
    }, [getCountryData]);


    const getWeatherDetails = async (e: FormEvent) => {
                e.preventDefault();
                setLoading(true);
                try {
                    const response = await axios.get(
                        `http://api.weatherstack.com/current?access_key=60774ad1b455f3cff7d3f8a273f488f5&query=${capitalName}`
                    );
                    const data = response.data;
                    setWeatherInfo(data.current);
                    setLoading(false);
                } catch (error) {
                    setWeatherApiError(true);
                }
            };
        
            const getBackToHome = (e: FormEvent) => {
                e.preventDefault();
                navigation('/');
            };
            function useParams<T>(): { name: any; } {
                throw new Error('Function not implemented.');
            }

    return (
        
    <View>
        <View>
             <Text>Country details</Text>
            
        </View>
        <View>
            {countryInfo ? (
            <View data-testid="country-info">
                <Text>Capital: {countryInfo.capital[0]}</Text>
                <Text>Population: {countryInfo.population}</Text>
                <Text>
                    Latitude: {countryInfo.latlng[0]}
                    <sup>o</sup>
                </Text>
                <Text>
                    Longitude: {countryInfo.latlng[1]}
                    <sup>o</sup>
                </Text>
                <small>Country Flag : </small>
                <img src={countryInfo.flags.svg} height="70px" alt="" />

                <br />
                <br />
                <Button
                    title="Capital Weather"
                    onPress={{getWeatherDetails}}
                />
                
           </View>
        ) : (
            
        )}

        {weatherInfo ? (
            <View
                className="weather-content"
                data-testid="weather-details">
                <br />
                <Text>Weather Info</Text>
                <br />
                <img
                    src={weatherInfo.weather_icons[0]}
                    alt="Weather Icon"
                />
                <Text>
                    Temperature: {weatherInfo.temperature}
                    <sup>o</sup>
                </Text>
                <Text>Wind Speed: {weatherInfo.wind_speed}</Text>
                <Text>Precip: {weatherInfo.precip}</Text>
            </View>
        ) : (
            
        )}
        </View>
        

    </View>   
    
           
        
    );


};



