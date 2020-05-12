import { expect } from 'chai';
import axios from 'axios';
import { alphaApiToken } from '../src/secrets';
import regeneratorRuntime from "regenerator-runtime";


describe('Get API', () => {

    it('should return the correct data searched for', async () => {
        const stock = "aapl";
        const { data } = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&outputsize=full&apikey=${alphaApiToken}`);
        const date = data["Meta Data"]["3. Last Refreshed"];
  
        expect(data["Meta Data"]["2. Symbol"]).to.equal(stock);
        expect(typeof data["Time Series (Daily)"]).to.equal('object');
        expect(typeof data["Time Series (Daily)"][date]).to.equal('object');
        expect(typeof Number(data["Time Series (Daily)"][date]["1. open"])).to.equal('number');
    });
  })


