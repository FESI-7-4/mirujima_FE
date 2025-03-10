import Header from './(auth)/_components/Header';
import HeroImages from './_components/heroImages/HeroImages';
import IntroText from './_components/introText/IntroText';

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
        <div className="flex h-full w-full flex-col space-y-[60px] rounded-[20px] border border-gray200 px-6 py-[40px] desktop:flex-row">
          <IntroText />
          <HeroImages />
        </div>
      </div>
    </>
  );
}
