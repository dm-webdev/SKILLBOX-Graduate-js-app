import React, { useEffect, useRef } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useLocation } from "react-router-dom";
import { getListPhoto } from "../../utils/unsplash";
import { AddButton } from "./AddButton";
import { CardList } from "./CardList";
import "./content.css";
import { TRootReducer } from "../../store/rootReducer";
import { TUserDataReducer } from "../../store/userReducer/userDataReducer";

export function Content() {
  const dispatch = useDispatch();
  const bottomMarker = useRef<HTMLDivElement>(null);
  const bottomOfList = bottomMarker.current;
  const userData = useSelector<TRootReducer, TUserDataReducer>(state => state.userData);
  const isUserDataPresent = !!userData?.numeric_id;
  const locationGallery = useLocation().pathname.includes("/gallery");

  useEffect(() => {
    const observer = new IntersectionObserver(
      () => dispatch(getListPhoto()),
      { rootMargin: "100px" }
    );

    if (bottomOfList) {
      observer.observe(bottomOfList);
    }

    return () => {
      if (bottomOfList) {
        observer.unobserve(bottomOfList);
      }
    };
  }, [bottomOfList]);

  return (
    <main className="content container">
      <CardList />

      {isUserDataPresent && <AddButton />}

      {locationGallery && <div className="content__bottom" ref={bottomMarker} />}
    </main>
  );
}
