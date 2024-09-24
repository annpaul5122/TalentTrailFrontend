import Header from '../components/homepage/Header';
import HomeSection from '../components/homepage/HomeSection';
import WhyUsSection from '../components/homepage/WhyUsSection';
import TopRecruiters from '../components/homepage/TopRecruiters';
import Footer from '../components/homepage/Footer';

const Home = () => {

    const scrollToSection = () => {
        const section = document.getElementById('why-us');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      };

    return(
        <div>
            <Header onScrollToSection={scrollToSection}/>
            <HomeSection/>
            <WhyUsSection/>
            <TopRecruiters/>
            <Footer/>
        </div>
    )
}

export default Home;