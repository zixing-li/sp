import React, { Component } from 'react';
import {
  ReactiveBase,
  DataSearch,
  MultiList,
  RangeSlider,
  SingleRange,
  SelectedFilters,
  ResultCard
} from '@appbaseio/reactivesearch';
import './App.css';

class Search extends Component {
  render() {
    return (
      <ReactiveBase
        app="good-books-ds"
        credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
      >
        <div className="navbar">
          <div className="logo">
            The Booksearch App
          </div>
          <DataSearch
            className="datasearch"
            componentId="mainSearch"
            dataField={["original_title", "original_title.search", "authors", "authors.search"]}
            queryFormat="and"
            placeholder="Search for a book title or an author"
            innerClass={{
              "input": "searchbox",
              "list": "suggestionlist"
            }}
            autosuggest={false}
            iconPosition="left"
            filterLabel="search"
          />
        </div>
        <div className={"display"}>
          <div className={"leftSidebar"}>
            <SingleRange
              componentId="ratingsFilter"
              dataField="average_rating_rounded"
              title="Book Ratings"
              data={[
                { start: 4, end: 5, label: "★★★★ & up" },
                { start: 3, end: 5, label: "★★★ & up" },
                { start: 2, end: 5, label: "★★ & up" },
                { start: 1, end: 5, label: "★ & up" },
              ]}
              react={{
                and: "mainSearch"
              }}
              filterLabel="Ratings"
            />
            <RangeSlider
              componentId="publishFilter"
              dataField="original_publication_year"
              title="Year of Publication"
              filterLabel="published"
              range={{
                start: 1970,
                end: 2017
              }}
              rangeLabels={{
                start: "1970",
                end: "2017"
              }}
              interval={2}
            />
            <MultiList
              componentId="authorFilter"
              dataField="authors.raw"
              title="Authors"
              size={1000}
              showCheckbox={false}
              className="authors"
              innerClass={{
                "list": "author-list"
              }}
              placeholder="Filter by author name"
              filterLabel="Authors"
            />
          </div>
          <div className={"mainBar"}>
            <SelectedFilters />
            <ResultCard
              componentId="results"
              dataField="original_title"
              react={{
                "and": ["mainSearch", "ratingsFilter", "publishFilter", "authorFilter"]
              }}
              pagination={true}
              size={8}
              sortOptions={[
                { dataField: "average_rating", sortBy: "desc", label: "Ratings (High to low)" },
                { dataField: "original_title.raw", sortBy: "asc", label: "Title A->Z"},
                { dataField: "original_title.raw", sortBy: "desc", label: "Title Z->A"}
              ]}
              onData={(res)=>(
                {
                  "image": res.image,
                  "title": res.original_title || " ",
                  "description":  res.average_rating + " ★ " +
                  "<span style='float:right;margin-right:5px;'>Pub: " + res.original_publication_year + "</span><br/><br/><div class='result-author' title='" + res.authors + "'>by " + res.authors + "</div>",
                  "url": "https://google.com/search?q=" + res.original_title
                }
              )}
              className="result-data"
              innerClass={{
                "image": "result-image",
                "resultStats": "result-stats"
              }}
            />
          </div>
        </div>
      </ReactiveBase>
    );
  }
}

export default Search;