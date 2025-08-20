
# <a href="https://fakhr-twfd-6oa3jqfb0-fakhrbashas-projects.vercel.app/login">Demo</a>

### react hook form

#### register page

- useForm hook is used to create a form.

```jsx
const { handleSubmit, register } = useForm();
```

- handleSubmit is used to handle the form submission.
- register is used to register the form fields.
- include default value

```jsx
const { handleSubmit, register } = useForm({
  defaultValues: {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    dateOfBirth: '',
    gender: '',
  },
});
```

```jsx
async function submit(formData) {
  // console.log(formData);
  const data = await registerApi(formData);
  console.log(data);
}
```

```jsx
return (
  <>
    <form onSubmit={handleSubmit(submit)}>
      <div className=" flex flex-col gap-6">
        <h1 className="text-blue-500 text-center">Register Page</h1>
        <Input
          variant="bordered"
          label="name"
          type="name"
          {...register('name')}
        />
        <Input
          variant="bordered"
          label="Email"
          type="email"
          {...register('email')}
        />
        <Input
          variant="bordered"
          label="password"
          type="password"
          {...register('password')}
        />
        <Input
          variant="bordered"
          label="confirm password"
          type="password"
          {...register('rePassword')}
        />
        <Input
          variant="bordered"
          label="Date Of Birth"
          type="date"
          {...register('dateOfBirth')}
        />
        <Select
          variant="bordered"
          className="max-w-xl"
          label="Gender"
          {...register('gender')}
        >
          <SelectItem key={'male'}>Male</SelectItem>
          <SelectItem key={'female'}>Female</SelectItem>
        </Select>
        <Button
          type="submit"
          isLoading={false}
          color="primary"
          variant="bordered"
        >
          Register
        </Button>
      </div>
    </form>
  </>
);
```

> validation

```jsx
    <Input variant='bordered' label="name" type="name" {...register('name' ,{required:true})} />

          <Input variant='bordered' label="Email" type="email" {...register('email' , {required:"Email IS Required"})} />


```

- pattern
  > don't use this validation

```jsx
<Input
  variant="bordered"
  label="Email"
  type="email"
  {...register('email', {
    required: 'Email is Required',
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: 'invalid email',
    },
  })}
/>
```

- error message

```jsx
<Input
  isInvalid={Boolean(errors?.name?.message)}
  errorMessage={errors?.name?.message}
  variant="bordered"
  label="name"
  type="name"
  {...register('name', { required: 'Name Is Required' })}
/>
```

> use Schema validation

- npm install zod
- in zod by default required

- num -< min , max
- string -< minLength , maxLength

> mode : when validation start on submit or on blur

```jsx
const {
  handleSubmit,
  register,
  formState: { errors },
  reset,
} = useForm({
  defaultValues: {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    dateOfBirth: '',
    gender: '',
  },
  resolver: zodResolver(schema),
  mode: 'onBlur',
});
```

#### handle network

- handle api login if has response return if not has response and have message return error

```jsx
export async function loginApi(formData) {
  try {
    const { data } = await axios.post(baseUrl + 'users/signin', formData);
    return data;
  } catch (error) {
    return error.response ? error.response.data : { error: error.message };
  }
}
```

```jsx
async function handleLogin(formData) {
  setErrMsg('');
  setIsLoading(true);

  const data = await loginApi(formData);
  setIsLoading(false);

  if (data.message == 'success') {
    localStorage.setItem('token', data.token);
    navigate('/');
  } else {
    setErrMsg(data.error); // error always in object So the object was unified
  }
}
```

#### protected route

- to make protect in pages same you don't allow to join the feed page before login

1. make component protected route and this has children destruct it
   - if you have account (token) navigate to feed page else navigate to login page

```jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isLogged = localStorage.getItem('token') != null;

  return isLogged ? children : <Navigate to={'/login'} />;
}
```

- in app.jsx

```jsx
    path:'' , element: <MainLayout />, children:[
    {index:true , element : <ProtectedRoute><Feed /></ProtectedRoute>},
    {path:'post' , element: <ProtectedRoute><PostDetails /></ProtectedRoute>},
    {path:'*' , element: <NotFound />}
    ]
```

- protected route in login if you don't have account must create acc first and navigate to feed page

```jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedAuthRoute({ children }) {
  const isLoggedIn = localStorage.getItem('token') != null;
  return !isLoggedIn ? children : <Navigate to={'/'} />;
}
```

```jsx
  {path:'', element : <AuthLayout /> , children:[
    {path:'login' , element :<ProtectedAuthRoute><Login /></ProtectedAuthRoute>},
    {path:'register' , element : <ProtectedAuthRoute><RegisterPage /></ProtectedAuthRoute>}

  ]},
```

#### add Navbar

```jsx
import {
  Navbar as HeroUi,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@heroui/react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') != null; // login
  function logOut() {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <HeroUi>
      <NavbarBrand>
        <p className="font-bold text-inherit">FAKHR</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        {isLoggedIn ? (
          <NavbarItem>
            <Button onPress={logOut} color="danger" variant="flat">
              Sign Out
            </Button>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="flex">
              <Button color="default" variant="flat">
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button color="primary" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </HeroUi>
  );
}
```

#### state management

- data shared in all project
- create folderContext

1. counterContext.jsx

```jsx
import { createContext, useState } from 'react';
export const counterContext = createContext();
export default function CounterContextProvider({ children }) {
  const [counter, setCounter] = useState(10);

  return (
    <counterContext.Provider value={{ counter, setCounter }}>
      {children}
    </counterContext.Provider>
  );
}
```

2. in navBar i need use context

```jsx
    const { counter} = useContext(counterContext)
    return (
        <HeroUi>
            <NavbarBrand>
                <p className="font-bold text-inherit">FAKHR {counter}</p>
```

3. in feed i need use counterContext

```jsx
import React, { useContext } from 'react';
import { counterContext } from '../contexts/CounterContext';
export default function Feed() {
  const { counter, setCounter } = useContext(counterContext);
  return (
    <div>
      <h1>feed {counter}</h1>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
        className="cursor-pointer"
      >
        Inc
      </button>
    </div>
  );
}
```

4. and in main.jsx add contextProvider

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <CounterContextProvider>
        <App />
      </CounterContextProvider>
    </HeroUIProvider>
  </StrictMode>
);
```

- when change in this button , it will change in all pages

#### authContext

```jsx
import { createContext, useState } from 'react';
export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('token') != null
  );

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
```

- login

```jsx
const { setIsLoggedIn } = useContext(AuthContext);
const [errMsg, setErrMsg] = React.useState('');
const [isLoading, setIsLoading] = React.useState(false);
const navigate = useNavigate();

async function handleLogin(formData) {
  setErrMsg('');
  setIsLoading(true);

  const data = await loginApi(formData);
  setIsLoading(false);

  if (data.message == 'success') {
    localStorage.setItem('token', data.token);
    //
    setIsLoggedIn(true);
    //
    navigate('/');
  } else {
    setErrMsg(data.error);
  }
}
```

- navbar

```jsx
const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

const navigate = useNavigate();
function logOut() {
  localStorage.removeItem('token');
  setIsLoggedIn(false);
  navigate('/login');
}
```

- ProtectedAuthRoute

```jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function ProtectedAuthRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  return !isLoggedIn ? children : <Navigate to="/" />;
}
```

- ProtectedRoute

```jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? children : <Navigate to="/login" />;
}
```

- main

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <CounterContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </CounterContextProvider>
    </HeroUIProvider>
  </StrictMode>
);
```

#### get & Display

- in file Feed and Posts Component

#### Comment

#### Post

---

> controlled input | controlled component & un => interview

#### React Query

- npm i @tanstack/react-query
- manage state from api

1. go to app.jsx -> import

```jsx
QueryClientProvider;
QueryClient;
```

2. create instance from query client

```jsx
const queryClient = new QueryClient();
```

3. pass query client to query client provider

```jsx
<QueryClientProvider client={queryClient}>
  all the components that need to use query client
</QueryClientProvider>
```

4. now use react query
   > useQuery

```jsx
useQuery({
  queryKey: [''], //=> name of api
  queryFn: () => {
    'https://fakestoreapi.com/products';
  }, //=> function that return promise
});
```

- this query return object contains method and property use to destruct we need to destruct {data}

```jsx
{ data } = useQuery({
  queryKey:["products"] ,
  queryFn:()=>{"https://fakestoreapi.com/products"}
})
cl(data) == data->data->data-> products
cl(data?.data.data)
```

- don't need to await it because it return promise

```jsx
return (
  <div className="grid grid-col-5 gap-3 ">
    {data?.data.data.map((product, index) => {
      return (
        <div key={index}>
          <img src={product.image} alt="" />
          <h1>{product.title}</h1>
          <p>{product.price}</p>
          <p>{product.category}</p>
        </div>
      );
    })}
  </div>
);
```

- if you go to home and go back to product not load data because it is cached

> You can use select to get the data from the query directly

```jsx
{ data } = useQuery({
  queryKey:["products"] ,
  queryFn:()=>{"https://fakestoreapi.com/products"},
  select:(data) => data.data.data
})
cl(data)
```

- for loading

```jsx
{ data , isLoading, isFetching } = useQuery({
  queryKey:["products"] ,
  queryFn:()=>{"https://fakestoreapi.com/products"},
  select:(data) => data.data.data
})

if(isLoading){
  return <h1>Loading...</h1>
}


return (
  <div className="grid grid-col-5 gap-3 ">
  <h1>isLoading: {isLoading}</h1>
    {data?.data.data.map((product, index) => {
      return (
        <div key={index}>
          <img src={product.image} alt="" />
          <h1>{product.title}</h1>
          <p>{product.price}</p>
          <p>{product.category}</p>
        </div>
      );
    })}
  </div>
);
```

- isLoading => fetch && noData in cache
- isFetching => fetch && data in cache
- isError => error in fetch
- error => error in fetch
- isFetched => true when fetch data
- refetch => when call fetch data

```jsx
  const { data , refetch, isLoading , isFetching }=useQuery({
    queryKey:['posts'],
    queryFn:getAllPostsApi,
    select:(data) => data?.data.posts,
  }
  )

  <>
      <div className='grid gap-3 max-w-3xl mx-auto'>
        <CreatePost getAllPosts={refetch}/>
        {
          isLoading ? <Loader /> :
            data.map((post) => {
              return <Posts getAllPosts={refetch} key={post.id} post={post} commentLimit={1} />
            })
        }

      </div>
    </>
```

- isError => error in fetch
- react Q have concept retry if request return error 3 time + 1 first request
- if i need turn off retry

```jsx
const { data, refetch, isLoading, isFetching, isError } = useQuery({
  queryKey: ['posts'],
  queryFn: getAllPostsApi,
  select: (data) => data?.data.posts,
  retry: false,
});
```

- retry:true -> inf retry
- retry:5 -> retry 5 times

- component rerender when use useState or pass props

```jsx
retry: (failureCount, error) => {
  console.log(failureCount, error);
  return failureCount != 4;
};
```

- retry 4 time

#### React Query Dev Tools

> same inspect show data has cached and status of data

- staleTime:5000 ->Data still fresh 5 second

```jsx
    staleTime: 5000,
    refetchOnMount: true,
    refetchOnReconnect: true, // when user turn off internet when connect refetch direct
    refetchOnWindowFocus: true
```

- don't run while data fresh
- when fresh change after 5 second to stale -> run

```jsx
  const { data = [], refetch, isLoading, isFetching, isError, error } = useQuery({
```

- data = [] -> init value because skip undefined

#### React Query Post Data useMutation

- await queryClient.invalidateQueries(['posts']) -> call posts from caches

- from this

```jsx
async function handleComment() {
  setIsSubmitting(true);
  const response = await addComment(comment, postId);
  if (response.message == 'success') {
    setComment('');
    await getAllPosts();
  }
  setIsSubmitting(false);
}
```

- to this

```jsx
const { mutate: handleAddComment, isPending } = useMutation({
  mutationFn: () => addComment(comment, postId),
  onSuccess: async (data) => {
    await queryClient.invalidateQueries(['posts']);
    setComment('');
  },
  onError: (error) => {
    console.log(error.message);
  },
});
```

- gcTime : 10000,
- gcTime : garbage collection time remove data from cache when time is over
- refetchOnWindowFocus : when user turn off internet when connect refetch direct
- refetchInterval : 1000 , send request after 1 second
- refetchOnMount : true , send request when page mount
- refetchOnReconnect : when user turn off internet when connect refetch direct
- refetchIntervalInBackground : 1000 , send request after 1 second in background
- refetchIntervalInBackground : true , send request when page
- refetchOnReconnect : when user turn off internet when connect refetch

#### Custom Hook

- use hooks in function component
- init directory named hooks
- useCounter.js

```js
import React, { useState } from 'react';

export default function useCounter(initValue = 0) {
  const [count, setCount] = useState(initValue);

  return [count, setCount];
}
```

- useFetch.js

```js
export default function useFetch(api) {
  const [data, setData] = useState(null);

  async function getData() {
    const { data } = await axios.get(api);
    setData(data);
  }
  useEffect(() => {
    getData();
  }, []);
  return data?.data;
}
```

```jsx
  custom hock
  const [counter, setCounter] = useCounter(10);
  console.log(counter);

  custom hook
  const  product  = useFetch("https://ecommerce.routemisr.com/api/v1/products");
  console.log("Product",product);
  const  brand  = useFetch("https://ecommerce.routemisr.com/api/v1/brands");
  console.log("Brands : ", brand);

```

#### useMemo

- memoization is a technique used to optimize performance by caching the result of a function or a component.
- useMemo is a hook that allows you to memoize a value or a function.
- use memoization to avoid re-rendering a component when a prop or state changes.
- in this example

```jsx
export default function Profile() {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  function isCounter2Even() {
    console.log('call');
    return counter2 % 2 == 0;
  }
  return (
    <>
      <div className="grid grid-cols-2 text-center p-4">
        <div>
          <h1>counter1 : {counter1}</h1>
          <button onClick={() => setCounter1(counter1 + 1)}>Inc</button>
        </div>
        <div>
          <h1>counter2 : {counter2}</h1>
          <h1>{isCounter2Even() ? 'Even' : 'Odd'}</h1>
          <button onClick={() => setCounter2(counter2 + 1)}>Inc</button>
        </div>
      </div>
    </>
  );
}
```

- i set isCounter2Even in counter2 only but this function call evert time click to any button because rerendering the component because useState
- now i need when click counter2 only run function useMemo optimize the performance

```jsx
useMemo(() => {}, []);
```

```jsx
// useMemo not a function return bool
const isCounter2Even = useMemo(() => {
  console.log('call');
  return counter2 % 2 == 0;
}, [counter2]);
```

```jsx
    <h1>counter2 : {counter2}</h1>
    <h1>{isCounter2Even ? "Even" : "Odd" }</h1>
    <button onClick={() => setCounter2(counter2 + 1)}>Inc</button>
```
- 
