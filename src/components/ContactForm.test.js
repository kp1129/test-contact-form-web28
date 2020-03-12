import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ContactForm from "./ContactForm";

test('ContactForm component loads without crashing', () => {
    render(<ContactForm />)
})

test('the form has four labeled inputs that are visible to the user', () => {
    // arrange
    const { getByLabelText } = render(<ContactForm />);

    // act / assert that these are in the form and wont throw an error
    const fNameInput = getByLabelText(/first name/i);
    const lNameInput = getByLabelText(/last name/i);
    const emailInput = getByLabelText(/email/i);
    const messageInput = getByLabelText(/message/i);

    // discovered that the labels were present but didn't have 
    // 'for' attributes configured properly. Fixed it.
})

test('on submit, the info entered into the inputs gets displayed', () => {
    // arrange
    const { getByLabelText, getByTestId, findByText, findAllByTestId } = render(<ContactForm />);
    const fNameInput = getByLabelText(/first name/i);
    const lNameInput = getByLabelText(/last name/i);
    const emailInput = getByLabelText(/email/i);
    const messageInput = getByLabelText(/message/i);

    // act - fill in input fields, then click submit
    fireEvent.change(fNameInput, {target: {name: "firstName", value: "katya"}});
    fireEvent.change(lNameInput, {target: {name: "lastName", value: "pavlopoulos"}});
    fireEvent.change(emailInput, {target: {name: "email", value: "katya@email.com"}});
    fireEvent.change(messageInput, {target: {name: "message", value: "this is actually not required"}});

        // grab the button and click it
        const button = getByTestId("submit");
        fireEvent.click(button);

    // assert that the input values submitted and are now displayed on the screen
    findByText("katya");
    findByText("pavlopoulos");
    findByText("katya@email.com");
    findByText("this is actually not required");

    const savedForm = findAllByTestId("submitted-data");
    expect(savedForm).toBeTruthy();
});

test('on submit, the form submits even if the last input is not filled in, since it is not required', () => {
    // arrange
    const { getByLabelText, getByTestId, findByText, findAllByTestId } = render(<ContactForm />);
    const fNameInput = getByLabelText(/first name/i);
    const lNameInput = getByLabelText(/last name/i);
    const emailInput = getByLabelText(/email/i);

    // act - fill in input fields, then click submit
    fireEvent.change(fNameInput, {target: {name: "firstName", value: "k"}});
    fireEvent.change(lNameInput, {target: {name: "lastName", value: "p"}});
    fireEvent.change(emailInput, {target: {name: "email", value: "k@email.com"}});

        // grab the button and click it
        const button = getByTestId("submit");
        fireEvent.click(button);

    // assert that the input values submitted and are now displayed on the screen
    findByText("k");
    findByText("p");
    findByText("k@email.com");

    const savedForm = findAllByTestId("submitted-data");
    expect(savedForm).toBeTruthy();
})
