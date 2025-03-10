'use client';

import Header from './(auth)/_components/Header';

export default function Home() {
  // const [valid, setValid] = useState<boolean | null>(null);
  // const router = useRouter();

  // useEffect(() => {
  // const handleValidCheck = async () => {
  //   try {
  //     const { data } = await apiWithClientToken.get('/user');
  //     console.log(data.id);
  //     setValid(data ? true : false);
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //     setValid(false);
  //   }
  // };
  // handleValidCheck();
  // }, []);

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-74px)] w-screen px-4 py-8">
        <div className="h-full w-full rounded-[20px] border border-gray200"></div>
      </div>
    </>
  );
}
