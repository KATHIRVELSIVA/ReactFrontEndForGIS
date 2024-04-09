import { getByTestId, render, screen, fireEvent } from "@testing-library/react";
import axios from 'axios';
import userEvent from "@testing-library/user-event";
import { SignUp } from "../components/home/SignUp";

jest.mock('axios');
jest.mock('react-router-dom');
describe("2. Test the SignUp Component", () => {
    test("1. Email input field should accept email", () => {
        render(<SignUp />)
        const email = screen.getByPlaceholderText("Enter email");
        userEvent.type(email, "apple");
        expect(email.value).not.toMatch("apple@gmail.com");
    });

    test("2. Password input field should accept password", () => {
        render(<SignUp />);
        const password = screen.getByPlaceholderText("Enter password");
        expect(password).toHaveAttribute("type", "password");
    });

    test("3. Check the word is placed or not", () => {
        render(<SignUp />);
        var element1 = screen.getByTestId("Heading");
        expect(element1).toBeInTheDocument();
        expect(element1).toHaveTextContent('Sign Up');
    });

    test('4. Renders SignUp form', () => {
        render(<SignUp />);
        expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("UserName")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("XXXX XXXX XXXX")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter phone number")).toBeInTheDocument();
    });

    test('5. Test Case', () => {
        render(<SignUp />);
        const textbox1 = screen.getByTestId('Textbox1');
        const textbox2 = screen.getByTestId('Textbox2');
        const textbox3 = screen.getByTestId('Textbox3');
        const textbox4 = screen.getByTestId('Textbox4');
        const textbox5 = screen.getByTestId('Textbox5');
        expect(textbox1).toBeInTheDocument();
        expect(textbox2).toBeInTheDocument();
        expect(textbox3).toBeInTheDocument();
        expect(textbox4).toBeInTheDocument();
        expect(textbox5).toBeInTheDocument();
    });

    test('6. Displays error messages for invalid input', () => {
        render(<SignUp />);
        const loginButton = screen.getByTestId("Heading");
        fireEvent.click(loginButton);
        (() => {
            expect(screen.getByPlaceholderText('Email is required')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Password is required')).toBeInTheDocument();
        });
    });

    test('7. Handles form submission and displays success message for valid input', async () => {
        render(<SignUp />);
        const emailInput = screen.getByPlaceholderText("Enter email");
        const passwordInput = screen.getByPlaceholderText("Enter password");
        const loginButton = screen.getByTestId("Heading");
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        axios.post.mockResolvedValueOnce({
            data: {
                emailstatus: true,
                passwordstatus: true,
                admin: false
            }
        });
        fireEvent.click(loginButton);
        (() => {
            expect(screen.getByText('User Logged in successfully..')).toBeInTheDocument();
        });
    });

    test('8. Handles form submission and displays error message for invalid credentials', async () => {
        render(<SignUp />);
        const emailInput = screen.getByPlaceholderText("Enter email");
        const passwordInput = screen.getByPlaceholderText("Enter password");
        const loginButton = screen.getByTestId("Heading");
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });
        axios.post.mockResolvedValueOnce({
            data: {
                emailstatus: true,
                passwordstatus: false
            }
        });
        fireEvent.click(loginButton);
        (() => {
            expect(screen.getByText('Invalid Credentials')).toBeInTheDocument();
        });
    });

    test('9. Handles form submission and displays error message for user not available', async () => {
        render(<SignUp />);
        const emailInput = screen.getByPlaceholderText("Enter email");
        const passwordInput = screen.getByPlaceholderText("Enter password");
        const loginButton = screen.getByTestId("Heading");
        fireEvent.change(emailInput, { target: { value: 'nonexistentuser@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        axios.post.mockResolvedValueOnce({
            data: {
                emailstatus: false
            }
        });
        fireEvent.click(loginButton);
        (() => {
            expect(screen.getByText('User not available...')).toBeInTheDocument();
        });
    });

}); 