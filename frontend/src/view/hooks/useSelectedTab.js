import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getTabId, setTabId } from "../../controller/reducer/ui";

export function useSelectedTab(curTabId){
    const dispatch = useDispatch();
    const tabId = useSelector(getTabId);
    useEffect(() => {
        if (tabId !== curTabId) dispatch(setTabId(curTabId));
      }, [tabId,curTabId,dispatch]);
}   