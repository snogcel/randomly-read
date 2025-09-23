import ReactGA from "react-ga4";

const myGa = () => {
    const GA_ID = 'G-HZ4HM6M2GK'; // your google analytics id
    ReactGA.initialize(GA_ID);
    ReactGA.send("pageview");

    console.log("initial landing GA")
};

export default myGa;