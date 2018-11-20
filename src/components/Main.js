import React, {Component} from 'react';
import { Preloader } from 'react-materialize';
import axios from 'axios';

import NewsList from './NewsList';

class Main extends Component {
    state = {
        allStories: [],
        sources: {
            hackerNews: {
                source: false,
                stories: null
            },
            redditProg: {
                source: false,
                stories: []
            },
            redditProgHum: {
                source: false,
                stories: []
            },
            redditJS: {
                source: false,
                stories: []
            },
            redditTech: {
                source: false,
                stories: []
            },
            freeCodeCamp: {
                source: false,
                stories: []
            },
            hackerNoon: {
                source: false,
                stories: []
            },
            codeBurst: {
                source: false,
                stories: []
            }
        }
      }
    
      fetchHackerNews = async () => {
        function fetchStoryIDs(){
          return axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
        }
        
        function fetchStory(storyID){
          return axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`)
        }
    
        function parseStory(story){
          const { id, title, url} = story
          return {
            id,
            title,
            url
          }
        }
    
        const top500IDs = await fetchStoryIDs();
          const top25IDs = top500IDs.data.slice(0,25)
          Promise.all(top25IDs.map((story, index) => {
            return fetchStory(story)
            .then(storyDetails => {
              return parseStory(storyDetails.data)
            })
          }))
          .then(stories => {
            const allStories = this.state.allStories
            stories.map(story => {
                story.source = "Hacker News"
              allStories.push(story)
            })
            this.setState({
              sources: {
                  hackerNews: {
                  stories
              }},
              allStories
            })
          })
          .catch(err => console.error(err))
      }
    
      fetchRedditProg = async () => {
        function fetchProgramming(){
          return axios.get('https://www.reddit.com/r/programming/hot.json?sort=new')
        }
    
        function reduceResult(result, allStories){
          const allPosts = result.data.data.children
          const postData = [];
          allPosts.map(post => {
            post.data.source = "r/Programming"
            postData.push(post.data)
            allStories.push(post.data)
          })
          return {postData, allStories}
        }
    
        axios.all([fetchProgramming()])
        .then(axios.spread((progPosts) => {
          const allStories = this.state.allStories
          const redditProg = reduceResult(progPosts, allStories)
          this.setState({
              sources: {
                redditProg: {
                    stories: redditProg
                },
              }
          })
        }))
        .catch(err => console.error(err))
      }

      fetchRedditProgHum = async () => {
        function fetchProgrammerHumor(){
          return axios.get('https://www.reddit.com/r/ProgrammerHumor/hot.json?sort=new')
        }
    
        function reduceResult(result, allStories){
          const allPosts = result.data.data.children
          const postData = [];
          allPosts.map(post => {
            post.data.source = "r/ProgrammerHumor"
            postData.push(post.data)
            allStories.push(post.data)
          })
          return {postData, allStories}
        }
    
        axios.all([fetchProgrammerHumor()])
        .then(axios.spread((progHumPosts) => {
          const allStories = this.state.allStories
          const redditProgHum = reduceResult(progHumPosts, allStories)
          this.setState({
              sources: {
                redditProgHum: {
                    stories: redditProgHum
                }
              }
          })
        }))
        .catch(err => console.error(err))
      }

      fetchRedditJS = async () => {
        axios.get('https://www.reddit.com/r/Javascript/hot.json?sort=new')
        .then(results => {
            const allStories = this.state.allStories
            const redditJS = reduceResult(results, allStories)
            this.setState({
                sources: {
                    redditJS: {
                        stories: redditJS
                    }
                },
            })
        })
        .catch(err => console.error(err))

        function reduceResult(result, allStories){
          const allPosts = result.data.data.children
          const postData = [];
          allPosts.map(post => {
            post.data.source = "r/Javascript"
            postData.push(post.data)
            allStories.push(post.data)
          })
          return {postData, allStories}
        }
      }

      fetchRedditTech = async () => {
        axios.get('https://www.reddit.com/r/Technology/hot.json?sort=new')
        .then(results => {
            const allStories = this.state.allStories
            const redditTech = reduceResult(results, allStories)
            this.setState({
                sources: {
                    redditTech: {
                        stories: redditTech
                    }
                },
            })
        })
        .catch(err => console.error(err))

        function reduceResult(result, allStories){
          const allPosts = result.data.data.children
          const postData = [];
            allPosts.map(post => {
            post.data.source = "r/Technology"
            postData.push(post.data)
            allStories.push(post.data)
          })
          return {postData, allStories}
        }
      }

      fetchMediumFCC = async () => {
          axios.get('https://api.rss2json.com/v1/api.json?rss_url=https://medium.freecodecamp.org/feed?truncated=true')
          .then(results => {
            const stories = results.data.items
            const allStories = this.state.allStories
            stories.map(story => {
                story.source = "FreeCodeCamp.org"
                allStories.push(story)
            })
            this.setState({
              sources: {
                  freeCodeCamp: {
                  stories
              }},
              allStories
          })
        })
          .catch(err => console.error(err))
      }

      fetchMediumHackerNoon = async () => {
        axios.get('https://api.rss2json.com/v1/api.json?rss_url=https://hackernoon.com/feed?truncated=true')
        .then(results => {
          const stories = results.data.items
          const allStories = this.state.allStories
          stories.map(story => {
            story.source = "HackerNoon"
            allStories.push(story)
          })
          this.setState({
            sources: {
                hackerNoon: {
                stories
            }},
            allStories
        })
      })
        .catch(err => console.error(err))
    }

    fetchMediumCodeBurst = async () => {
        axios.get('https://api.rss2json.com/v1/api.json?rss_url=https://codeburst.io/feed?truncated=true')
        .then(results => {
          const stories = results.data.items
          const allStories = this.state.allStories
          stories.map(story => {
            story.source = "codeburst.io"
            allStories.push(story)
          })
          this.setState({
            sources: {
                codeBurst: {
                stories
            }},
            allStories
        })
      })
        .catch(err => console.error(err))
    }
    
    async componentDidMount(){
        const { hackerNews, redditProg, redditProgHum, redditJS, redditTech, freeCodeCamp, hackerNoon, codeBurst } = this.props.location.state.sources
        if(hackerNews){
            this.setState({
                sources: {
                    hackerNews: {
                        source: true
                    }
                }
            })
            this.fetchHackerNews();
        }
        if(redditProg){
            this.setState({
                sources: {
                    redditProg: {
                        source: true
                    }
                }
            })
            this.fetchRedditProg();
        }
        if(redditProgHum){
            this.setState({
                sources: {
                    redditProgHum: {
                        source: true
                    }
                }
            })
            this.fetchRedditProgHum();
        }
        if(redditJS){
            this.setState({
                sources: {
                    redditJS: {
                        source: true
                    }
                }
            })
            this.fetchRedditJS();
        }

        if(redditTech){
            this.setState({
                sources: {
                    redditTech: {
                        source: true
                    }
                }
            })
            this.fetchRedditTech();
        }

        if(freeCodeCamp){
            this.setState({
                sources: {
                    freeCodeCamp: {
                        source: true
                    }
                }
            })
            this.fetchMediumFCC();
        }

        if(hackerNoon){
            this.setState({
                sources: {
                    hackerNoon: {
                        source: true
                    }
                }
            })
            this.fetchMediumHackerNoon();
        }

        if(codeBurst){
            this.setState({
                sources: {
                    codeBurst: {
                        source: true
                    }
                }
            })
            this.fetchMediumCodeBurst();
        }
    }

    render() {
        const allStories = this.state.allStories;

        if(allStories.length === 0){
        return <div id="preload-text">
            <h3>Fetching stories...</h3>
            <Preloader size='big'/>
            </div>
        }
    
        return (
            <div className="main">
                <NewsList stories={allStories}/>
            </div>
        )
    }
}

export default Main;