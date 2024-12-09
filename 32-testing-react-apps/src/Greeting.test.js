import { render, screen } from "@testing-library/react"
import Greeting from "./components/Greeting"

test('renders hello world as a text', () => {
    // Arange
    render(<Greeting/>);

    //Act 
    // ..nothing

    // Assert - look into virtual dom
    const helloWorldElement = screen.getByText('Hello World', { exact: false});
    expect(helloWorldElement).toBeInTheDocument();
})
