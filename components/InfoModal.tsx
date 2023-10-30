import React, {useCallback, useEffect, useState} from "react";
import { AiOutlineClose } from "react-icons/ai";

import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";