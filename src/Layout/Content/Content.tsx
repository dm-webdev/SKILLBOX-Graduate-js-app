import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getListPhoto } from "../../utils/unsplash";
import { AddButton } from "./AddButton";
import { CardList } from "./CardList";
import "./content.css";

export function Content() {
  const bottomMarker = useRef<HTMLDivElement>(null);
  const bottomOfList = bottomMarker.current;

  const dispatch = useDispatch();

  const locationAuth = useLocation().pathname.includes("/auth");
  const locationGallery = useLocation().pathname.includes("/gallery");
  console.log(useLocation());

  useEffect(() => {
    const observer = new IntersectionObserver(
      () => {
        dispatch(getListPhoto());
      },
      {
        rootMargin: "100px",
      }
    );

    if (bottomOfList) {
      observer.observe(bottomOfList);
    }

    return () => {
      if (bottomOfList) {
        observer.unobserve(bottomOfList);
      }
    };
  }, [bottomOfList, dispatch]);

  return (
    <main className="content container">
      <CardList />

      {(locationAuth || locationGallery) && <AddButton />}

      {locationGallery && (
        <div className="content__bottom" ref={bottomMarker} />
      )}
    </main>
  );
}
