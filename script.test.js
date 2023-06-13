/**
 * @jest-environment jsdom
 */

//npm init-y
//install --save-dev jest

//https://stackoverflow.com/questions/72013449/upgrading-jest-to-v29-error-test-environment-jest-environment-jsdom-cannot-be
//npm install -D jest-environment-jsdom

//https://stackoverflow.com/questions/64818305/simple-fetch-mock-using-typescript-and-jest/64819545#64819545
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ test: 100 }),
    }),
);

const {
    /*   togglePlayerListVisibility,
       fetchAllPlayers,
       fetchSinglePlayer,
       addNewPlayer,
       updatePlayer,
       removePlayer,
       fetchAllTeams,
       renderSinglePlayerById,
       renderAllPlayers,
       renderNewPlayerForm,
       renderUpdatedPlayerForm,
       init,
       playerContainer,
       newPlayerFormContainer,*/
    cohortName,
    APIURL
} = require("./script.js");

describe("cohort name", () => {

    it("returns if the cohortName is correct", () => {
        expect(cohortName).toBe('2302-ACC-PT-WEB-PT-A');
    });
    /*  // Test if the totalCost() function returns the correct total cost for sarah
      it("returns the correct total cost for sarah", () => {
        expect(totalCost(sarah.pricePerRefill, sarah.refills)).toBe(50);
      });
    
      // Test if the totalCost() function returns the correct total cost for timmy
      it("returns the correct total cost for timmy", () => {
        expect(totalCost(timmy.pricePerRefill, timmy.refills)).toBe(75);
      })
    
      // Test if the totalCost() function returns the correct total cost for rocky
      it("returns the correct total cost for rocky", () => {
        expect(totalCost(rocky.pricePerRefill, rocky.refills)).toBe(150);
      })*/
})

