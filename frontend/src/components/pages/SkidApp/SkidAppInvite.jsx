import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../../skidapp/skidapp.css'
import './SkidAppInvite.css'

import { joinInviteAction, getServerFromInviteAction } from '../../../actions/invite';

// import NewChannel from '../../skidapp/modals/newchannel/NewChannel'
// import NewCategory from '../../skidapp/modals/newcategory/NewCategory'
// import NewServer from '../../skidapp/modals/newserver/NewServer'

const SkidAppInvite = () => {
    const auth = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { inviteCode } = useParams();

    const serverFromLink = useSelector((state) => state.invite.serverFromInvite);

    useEffect(() => {
        dispatch(getServerFromInviteAction(inviteCode))
    }, [dispatch, inviteCode])

    const onClick = () => {
        if (!auth._id) return navigate('/login');
        dispatch(joinInviteAction(inviteCode));
        navigate(`/skid/${serverFromLink._id}/redirect`);
    }

    const redirect = () => {
        if (!auth._id) return navigate('/login');
        navigate(`/skid/@me`);
    }

    return (
        serverFromLink._id ? <div className="invite-body">
            <div className="modal-container-inv background-primary">
                <div className="modal-form-inv">
                    <div className="modal-form-header-inv">
                        <small className="modal-header-desc-inv">You have been invited to join</small>
                        <span className="modal-header-title-inv">{serverFromLink.name}!</span>
                    </div>
                </div>
                <button type="submit" onClick={onClick} className="submit-button-inv">Accept Invite</button>
            </div>
        </div> : <div className="invite-body">
            <div className="modal-container-inv2 show background-primary">
                <div className="modal-form">
                    <div className="modal-form-header-inv2">
                        <span className="modal-header-title-inv2">Invite Invalid</span>
                        <small className="modal-header-desc-inv2">This invite may be expired or you might not have permission to join.</small>
                    </div>
                </div>
                <button type="submit" onClick={redirect} className="submit-button-inv">Continue to Site</button>
            </div>
        </div>
    );
}

export default SkidAppInvite
