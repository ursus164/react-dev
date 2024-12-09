import { render, screen } from "@testing-library/react";
import  userEvent  from "@testing-library/user-event";
import Greeting from "./components/Greeting";

describe("<Greeting/>", () => {
  test("renders hello world as a text", () => {
    // Arange
    render(<Greeting />);

    //Act
    // ..nothing

    // Assert - look into virtual dom
    const helloWorldElement = screen.getByText("Hello World", { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders good to see you if button was NOT clicked", () => {
    // Arange
    render(<Greeting />);

    // Assert - look into virtual dom
    const outputParagraph = screen.getByText("good to see you", {
      exact: false,
    });
    expect(outputParagraph).toBeInTheDocument();
  });

  test("renders good to see you if button was clicked", () => {
    // Arange
    render(<Greeting />);

    // Act - click the button
    const buttonElement = screen.getByRole('button')
    userEvent.click(buttonElement);

    // Assert - look into virtual dom
    const outputParagraph = screen.getByText("changed", {
      exact: false,
    });
    expect(outputParagraph).toBeInTheDocument();
  });

  test("does not render good to see you if button was clicked", () => {
    // Arange
    render(<Greeting />);

    // Act - click the button
    const buttonElement = screen.getByRole('button')
    userEvent.click(buttonElement);

    // Assert - look into virtual dom
    const outputParagraph = screen.queryByText("good to see you", {
      exact: false,
    });
    expect(outputParagraph).toBeNull();
  });
});
