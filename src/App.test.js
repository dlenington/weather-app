import React from 'react';
import {cleanup, findByTestId, fireEvent, render, screen, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from './App';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

afterEach(cleanup)

it('Location name should display on AppCard when user types location and presses enter', async () => {
    const mockGeolocation = {
        getCurrentPosition: jest.fn()
        .mockImplementationOnce((success) => Promise.resolve(
            success({
                coords: {
                    latitude: 51.1,
                    longitude: 45.3
                }
            })
        ))
    };
    global.navigator.geolocation = mockGeolocation;

    let fakeAxios = new MockAdapter(axios);
    fakeAxios.onGet("https://api.weatherapi.com/v1/forecast.json").reply(200, {
        location: { 
            name: 'San Francisco',
            region: "California"
        },
        current: {
            condition: 
            {
                code: 1000,
                icon: "//cdn.weatherapi.com/weather/64x64/night/113.png",
                text: "Clear"
            },
                last_updated_epoch: 1606445107,
                temp_c: -0.6,
                temp_f: 30
        },
        forecast: {
            forecastday: [
                {
                    date_epoch: 1606348800,
                    day: {
                        maxtemp_f: 36.9,
                        mintemp_f: 30.7,
                        condition: {
                            icon: ""
                        }
                    }
                }
            ]
        }
 
    });

 await act(async () => {
    render(
        <App/>
        );
 });
 

    userEvent.type(screen.getByRole('textbox'), "Location");
    fireEvent.keyDown(screen.getByRole('textbox'), {key: 'Enter', code: 'Enter'})

    expect(await screen.getByTestId('location-name').textContent).toBe("San Francisco"); 
    
})
