import { useSearchParams } from 'react-router';
import { QueryParameters } from '../../../common/enums/query-parameters.ts';
import { CharacterInfo } from '../../../domain/IApiResponse.ts';
import picturePlaceholder from '../../../images/picture-placeholder.jpg';
import useFetchResults from '../../../hooks/useFetchResults.ts';
import { IResult } from '../../../domain/IResults.ts';
import Loader from '../../../common/widgets/loader/Loader.tsx';
import '../card/Card.css';
import ErrorFallback from '../../../common/widgets/errors/ErrorFallback.tsx';

const Details = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const detailsCardId = String(searchParams.get(QueryParameters.DETAILS));

  const result: IResult<CharacterInfo> = useFetchResults<CharacterInfo>(
    detailsCardId,
    null,
    true
  );

  const handleClose = () => {
    searchParams.delete(QueryParameters.DETAILS);
    setSearchParams(searchParams);
  };

  if (result.statusData.isLoading) {
    return <Loader />;
  }

  if (result.statusData.serverError) {
    return <ErrorFallback message={result.statusData.serverError} />;
  }

  if (!result.responseData) {
    return;
  }

  return (
    <div className="card" data-testid="card">
      <div>
        <h2 data-testid="characterName">{result.responseData.name}</h2>
        <div className="card-image">
          <img src={picturePlaceholder} alt={'404 placeholder'} />
        </div>
        <p>
          The character -{' '}
          <span className="bold-text">{result.responseData.name}</span> is{' '}
          <span className="red-text">{result.responseData.height}</span> height
          and it weighs around{' '}
          <span className="red-text">{result.responseData.mass}</span> kgs.{' '}
          <span className="bold-text">{result.responseData.name}</span>{' '}
          identifies as a{' '}
          <span className="red-text">{result.responseData.gender}</span> person
          and has a{' '}
          <span className="red-text">{result.responseData.eye_color}</span>{' '}
          eyes.
        </p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={handleClose}
            data-testid="closeButton"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
