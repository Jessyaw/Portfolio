import React, { Component, createRef } from 'react'
import { Color } from '../Colors'
import dev from '../../src/image/svg/Developer.svg'
import { Constant } from '../Constant';
import Home from './Home';
import About from './About';
import Project from './Project';
import Contact from './Contact';
import ProjectDetails from './ProjectDetails';


export default class Portfolio extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuList: [
                { id: 1, list: 'Home', isHighlight: true },
                { id: 2, list: 'Profile', isHighlight: false },
                { id: 3, list: 'Projects', isHighlight: false },
                { id: 4, list: 'Contact', isHighlight: false },
            ],
            technologies: [
                { id: 1, tech: 'ReactJS', isHighlight: false },
                { id: 2, tech: 'HTML', isHighlight: false },
                { id: 3, tech: 'CSS', isHighlight: false },
                { id: 4, tech: 'Javascript', isHighlight: false },
                { id: 5, tech: 'DexieJs', isHighlight: false },
            ],



        }
        this.sections = {
            Home: createRef(),
            Profile: createRef(),
            Projects: createRef(),
            Contact: createRef(),
        };
    }
    componentDidMount() {
        document.body.style.backgroundColor = Color.bgDark;
        window.addEventListener("scroll", this.handleScroll);
        window.addEventListener("scroll", this.revealOnScroll);
        this.revealOnScroll();
    }

    componentWillUnmount() {
        document.body.style.backgroundColor = '';
        window.removeEventListener("scroll", this.handleScroll);
        window.removeEventListener("scroll", this.revealOnScroll);
    }
    revealOnScroll = () => {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach((el) => {
            const windowHeight = window.innerHeight - 200;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100; // trigger point

            if (elementTop < windowHeight - elementVisible) {
                el.classList.add("active");
            } else {
                el.classList.remove("active");
            }
        });
    };
    handleScroll = () => {
        let scrollY = window.scrollY;
        let current = 'Home';
        Object.keys(this.sections).forEach(k => {
            const sec = this.sections[k].current;
            if (sec) {
                const offsetTop = sec.offsetTop;
                const offsetBottom = offsetTop + sec.offsetHeight;
                if (scrollY >= offsetTop) {
                    current = k;
                }
            }
        })

        this.setState((prevState) => ({
            menuList: this.state.menuList?.map(i => ({
                ...i, isHighlight: i.list == current
            }))
        }))

    }
    scrollToSection = (section) => {
        this.sections[section].current.scrollIntoView({ behavior: 'smooth' })
    }

    render() {
        return (
            <div>
                {/* Nav bar */}
                <div style={{ display: 'flex', position: 'fixed', top: 0, right: 0, left: 0, backgroundColor: Color.bgDark, zIndex: 100 }}>
                    <div style={{ flex: 1 }} />
                    <div className='medium-heading' style={{ flex: 3, margin: '20px 0px ', color: Color.primaryPurple }}>JESS</div>
                    <div style={{ flex: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <ol className='nav-list'>
                            {this.state.menuList?.map(i =>
                                <li
                                    className={i.isHighlight ? 'active' : ''}
                                    key={i.id}
                                    onClick={() => this.scrollToSection(i.list)}
                                >{i.list}</li>
                            )}
                        </ol>
                    </div>
                    <div style={{ flex: 1 }} />
                </div>
                <div className='col' style={{ gap: '70px', margin: '70px 0px' }}>
                    <section className='reveal' ref={this.sections.Home}>
                        <Home
                            onSelectProject={() => this.scrollToSection('Projects')}
                            onSelectContact={() => this.scrollToSection('Contact')}
                        />
                    </section>
                    <section className='reveal' ref={this.sections.Profile}> <About />  </section>
                    <section className='reveal' ref={this.sections.Projects}> <Project /> </section>
                    <section className='reveal' ref={this.sections.Contact}> <Contact /> </section>
                </div>
            </div >
        )
    }
}
