import Header from './(auth)/_components/Header';
import HeroImages from './_components/heroImages/HeroImages';
import IntroText from './_components/introText/IntroText';
import PWAButton from './_components/PWAButton/PWAButton';

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
    <div className="custom-scrollbar h-full min-h-[calc(100vh-74px)] w-full overflow-y-scroll">
      <Header />
      <div className="mx-auto my-8 flex w-[calc(100vw-32px)] max-w-[1120px] flex-col space-y-[60px] rounded-[20px] border border-gray200 px-6 py-[40px] md:items-center desktop:flex-row desktop:justify-center desktop:gap-[120px]">
        <IntroText />
        <HeroImages />
        <PWAButton className="desktop:hidden" />
      </div>
    </div>
  );
}
