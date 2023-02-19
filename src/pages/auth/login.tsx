import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEventHandler, useState } from 'react';

const SignIn: NextPage = () => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // add some client side validations like empty fields, password length, etc.
    e.preventDefault();

    setLoading(true);
    // const res = await signIn('credentials', {
    //   email: userInfo.email,
    //   password: userInfo.password,
    //   redirect: false,
    // }).then((res) => {
    //   setLoading(false);
    //   return res;
    // });

    // if (res?.error) {
    //   setLoading(false);
    //   setError(res.error);
    // }

    // if (res?.ok) {
    //   setError('');
    //   setUserInfo({ email: '', password: '' });
    //   router.push('/');
    // }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form
          className="flex flex-col gap-3 border border-black p-5 rounded-xl"
          onSubmit={handleSubmit}
        >
          <input
            value={userInfo.email}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, email: target.value })
            }
            type="email"
            placeholder="john@email.com"
          />
          <input
            value={userInfo.password}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, password: target.value })
            }
            type="password"
            placeholder="********"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
          {error && <div className="text-red-500">{error}</div>}
        </form>
      )}
    </div>
  );
};

export default SignIn;
