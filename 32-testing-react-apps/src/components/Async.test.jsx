import { render, screen } from "@testing-library/react"
import Async from "./Async"
import React from "react"

describe('Async component', () => {
    test('renders posts if request succeeds', async () => {

        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{id:'p1',title:'First post'}] // we avoid some unnecessary network trafic - and can control different outcomes with some error scenarions to find out how our app behaves in that case
        });

        render(<Async/>)
        // we do not want to send any http request - we want to do it via some test development server (MOCK data). We do not want to test code that we did not written - e.g fetch function that is built into browser. We want to check if component behaves correctly once we get the data or not.

        const listItemElements = await screen.findAllByRole('listitem')
        expect(listItemElements).not.toHaveLength(0);
    })
})