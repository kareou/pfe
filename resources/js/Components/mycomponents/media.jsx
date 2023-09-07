import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Videos from "./videos";
import Backdrops from "./Backdrops";
import Poste from "./Posters";
import { fetchMovieVideos, fetchMovieBackdrops, fetchMoviePosters, fetchMovieKeywords,
    fetchTvKeywords, fetchTvVideos, fetchTvBackdrops, fetchTvPosters
} from "./service";
import videos from "./videos";
import Keywords from "./keywords";

function media({ movie,type }) {
    const theme = createTheme({
        components: {
            MuiTabs: {
                styleOverrides: {
                    indicator: {
                        backgroundColor: "#BE3144",
                    },
                },
            },
        },
    });

    const [backdrops, setBackdrops] = useState([]);
    const [media, setMedia] = useState([]);
    const [posters, setPosters] = useState([]);
    const [keyword, setKeyword] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                var backdropsData = [];
                var mediaData = [];
                var postersData = [];
                var keywordData = [];
                if(type === "movie"){
                    backdropsData= await fetchMovieBackdrops(movie.id);
                 mediaData = await fetchMovieVideos(`/movie/${movie.id}/videos`);
                 postersData = await fetchMoviePosters(movie.id);
                 keywordData = await fetchMovieKeywords(movie.id);
                }else{
                    backdropsData= await fetchTvBackdrops(movie.id);
                     mediaData = await fetchTvVideos(movie.id);
                     postersData = await fetchTvPosters(movie.id);
                     keywordData = await fetchTvKeywords(movie.id);
                }

                setBackdrops(backdropsData);
                setMedia(mediaData);
                setPosters(postersData);
                setKeyword(keywordData);

            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [movie.id]);

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className=" border-b-my_red border-b pb-2">
            <div className="flex items-center gap-1">
                <div className="w-[5px] h-[40px] bg-my_red"></div>
                <h1 className=" text-my_gray2 text-xl font-bold">Medias</h1>
            </div>
            <div className="md:flex">
                <div className="md:w-[80%] w-full">
                    <ThemeProvider theme={theme}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                        >
                            <Tab
                                label="Traillers"
                                style={{ color: "#3A4750", fontWeight: "600" }}
                            />
                            <Tab
                                label="Backdrops"
                                style={{ color: "#3A4750", fontWeight: "bold" }}
                            />
                            <Tab
                                label="Posters"
                                style={{ color: "#3A4750", fontWeight: "bold" }}
                            />
                        </Tabs>
                    </ThemeProvider>
                    {value === 0 && <Videos movie={media} />}
                    {value === 1 && <Backdrops movie={backdrops} />}
                    {value === 2 && <Poste movie={posters} />}
                </div>
                <div className="ml-4 w-1/5">
                    <Keywords keyword={keyword} type={type} />
                    </div>
            </div>
        </div>
    );
}

export default media;
