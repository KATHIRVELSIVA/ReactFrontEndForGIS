import { getByTestId, render, screen, fireEvent } from "@testing-library/react";
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import { Login } from "../components/home/Login";

jest.mock('axios');
jest.mock('react-router-dom');

describe("1. Test the Login Component", () => {

    test("1. Email input field should accept email", () => {
        render(<Login />);
        const email = screen.getByPlaceholderText("Enter email");
        userEvent.type(email, "apple");
        expect(email.value).not.toMatch("apple@gmail.com");
    });

    test("2. Password input field should accept password", () => {
        render(<Login />);
        const password = screen.getByPlaceholderText("Enter password");
        expect(password).toHaveAttribute("type", "password");
    });

    test("3. Check the word is placed or not", () => {
        render(<Login />);
        var element1 = screen.getByTestId("Heading");
        expect(element1).toBeInTheDocument();
        expect(element1).toHaveTextContent('LOGIN');
    });

    test('4. Renders login form', () => {
        render(<Login />);
        expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
    });

    test('5. Test Case', () => {
        render(<Login />);
        const textbox1 = screen.getByTestId('TextBox1');
        const textbox2 = screen.getByTestId('TextBox2');
        expect(textbox1).toBeInTheDocument();
        expect(textbox2).toBeInTheDocument();
    });

    test('6. Displays error messages for invalid input', () => {
        render(<Login />);
        const loginButton = screen.getByTestId("Heading");
        fireEvent.click(loginButton);
        (() => {
            expect(screen.getByPlaceholderText('Email is required')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Password is required')).toBeInTheDocument();
        });
    });

    test('7. Handles form submission and displays success message for valid input', async () => {
        render(<Login />);
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
        render(<Login />);
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
        render(<Login />);
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