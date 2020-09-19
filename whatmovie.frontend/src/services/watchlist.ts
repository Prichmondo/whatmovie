import { IResponse, getErrorResponse, getSuccessResponse } from "../domain/IResponse";
import { put, del, BASEURL } from './apiClient';
import { IPagingData } from "../domain/IPagingData";
import { IMovie } from "../domain/IMovie";

export async function addToWatchList(  
  movieId: number
): Promise<IResponse<IPagingData<IMovie>>> {
  try {
    const response = await put<IPagingData<IMovie>>(`${BASEURL}/watchlist`, { body: JSON.stringify({ 'movieId': movieId }) });
    return getSuccessResponse(response);
  } catch (error) {
    return getErrorResponse(error.code, error.message);
  }

}

export async function removeToWatchList(  
  movieId: number
): Promise<IResponse<IPagingData<IMovie>>> {
  try {
    const response = await del<IPagingData<IMovie>>(`${BASEURL}/watchlist`, { body: JSON.stringify({ 'movieId': movieId }) });
    return getSuccessResponse(response);
  } catch (error) {
    return getErrorResponse(error.code, error.message);
  }
}