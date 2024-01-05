import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import Button from '../../components/Button';
import { InputWithLabel } from '../../components/Input';
import PhoneNumberInput from '../../components/PhoneNumberInput';
import {
    changeSignupBirthDate,
    changeSignupConfirmPassword,
    changeSignupEmail,
    changeSignupFirstName,
    changeSignupLastName,
    changeSignupPassword,
    changeSignupPhone,
    changeSignupUsername,
    changeTermsOfServiceAgreement,
    setCredentials,
    useSignUpUserMutation,
} from '../../store';
import { RootState } from '../../store/index';
import { User } from '../../types/user';
import { errorToast } from '../../utils/toasts';

export default function SignupPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        firstName,
        lastName,
        username,
        email,
        phone,
        birthDate,
        password,
        confirmPassword,
        termsOfServiceAgreement,
    } = useSelector((state: RootState) => state['signup-form']);
    const [searchParams, setSearchParams] = useSearchParams();
    const [signUp, { isLoading, isError, error, reset: resetMutation }] =
        useSignUpUserMutation();

    // Error handling
    useEffect(() => {
        if (isError) {
            errorToast(JSON.stringify(error));
            resetMutation();
        }
    }, [isError]);

    // Google oauth
    useEffect(() => {
        const user = searchParams.get('userData');
        if (user) {
            setSearchParams({}, { replace: true });
            const userData = JSON.parse(user);
            const [fname, ...lname] = userData.full_name.split(' ');
            dispatch(changeSignupEmail(userData.email));
            dispatch(changeSignupUsername(userData.username));
            dispatch(changeSignupFirstName(fname));
            dispatch(changeSignupLastName(lname.join(' ')));
        }
    }, []);

    const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user: Partial<User> = {
            fname: firstName,
            lname: lastName,
            dob: birthDate,
            username,
            email,
            phoneNumber: `+${phone}`,
            password,
        };

        try {
            const result = await signUp(user).unwrap();
            const { access_token, user: loggedInUser } = result.data;
            dispatch(
                setCredentials({ token: access_token, user: loggedInUser }),
            );
            navigate('/auth/interests');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full lg:w-3/5 py-8">
            <form
                className="flex flex-col gap-2 3xs:w-[20rem] md:!w-[25rem]"
                onSubmit={handleSubmitForm}
            >
                <h1 className="text-5xl 3xs:max-md:text-[2.5rem] text-neutral-600 font-black text-center py-10 tracking-tight">
                    Create Account
                </h1>

                <div className="flex gap-2 w-full justify-between 3xs:max-md:flex-col">
                    <InputWithLabel
                        required
                        label="First Name"
                        value={firstName}
                        onChange={(e) => {
                            dispatch(changeSignupFirstName(e.target.value));
                        }}
                    />
                    <InputWithLabel
                        required
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => {
                            dispatch(changeSignupLastName(e.target.value));
                        }}
                    />
                </div>

                <InputWithLabel
                    required
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => {
                        dispatch(changeSignupUsername(e.target.value));
                    }}
                />

                <InputWithLabel
                    required
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                        dispatch(changeSignupEmail(e.target.value));
                    }}
                />

                <InputWithLabel
                    required
                    value={birthDate}
                    type="date"
                    label="Birth Date"
                    onChange={(e) => {
                        dispatch(changeSignupBirthDate(e.target.value));
                    }}
                />

                <PhoneNumberInput
                    value={phone}
                    onChange={(value) => {
                        dispatch(changeSignupPhone(value));
                    }}
                />

                <div className="flex gap-2 w-full justify-between 3xs:max-md:flex-col">
                    <InputWithLabel
                        required
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => {
                            dispatch(changeSignupPassword(e.target.value));
                        }}
                    />
                    <InputWithLabel
                        required
                        type="password"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => {
                            dispatch(
                                changeSignupConfirmPassword(e.target.value),
                            );
                        }}
                    />
                </div>

                <div className="flex items-center gap-2 my-4">
                    <input
                        required
                        className="accent-indigo-800 w-4 h-4"
                        type="checkbox"
                        id="terms&conditions"
                        checked={termsOfServiceAgreement}
                        onChange={(e) => {
                            dispatch(
                                changeTermsOfServiceAgreement(e.target.checked),
                            );
                        }}
                    />
                    <label htmlFor="terms&conditions">
                        I agree to the{' '}
                        <Link to="/terms-and-conditions">
                            Terms of Service and Privacy Policy
                        </Link>
                    </label>
                </div>

                <div className="flex flex-col gap-4">
                    <Button
                        select="primary700"
                        type="submit"
                        className="flex items-center justify-center gap-2 text-lg h-11 py-2 w-full"
                        loading={isLoading}
                    >
                        Create
                    </Button>

                    <Button
                        type="button"
                        className="flex items-center justify-center gap-2 text-lg h-11 py-2 w-full"
                    >
                        <a
                            href={`${
                                import.meta.env.VITE_BACKEND
                            }/api/auth/login/google`}
                            className="flex items-center justify-center gap-2 text-white"
                        >
                            <FcGoogle className="p-[1px] rounded-full bg-white box-content" />
                            Sign up with google
                        </a>
                    </Button>
                </div>

                <p className="flex gap-2 justify-center my-3">
                    Already has an account?
                    <Link to="/auth/login">Login</Link>
                </p>
            </form>
        </div>
    );
}
