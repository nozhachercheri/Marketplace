import React from 'react'

export default function Avis({avi}) {
    return (
        <div style={{marginTop:"15px"}} className="col-lg-8">
            <div className="ps-lg-4">
                <div className="d-flex flex-wrap align-items-start gap-3">
                    <h5 className="fs-14">Avis : </h5>
                </div>
                <div
                    className="me-lg-n3 pe-lg-4"
                    data-simplebar=""
                    style={{ maxHeight: 225 }}
                >
                    <ul className="list-unstyled mb-0">
                        <li className="py-2">
                            <div className="border border-dashed rounded p-3">
                                <div className="d-flex align-items-start mb-3">
                                    <div className="hstack gap-3">
                                        <div className="vr" />
                                        <div className="flex-grow-1">
                                            <p className="text-muted mb-0">
                                             
                                               Description :  {avi.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-end">
                                    <div className="flex-grow-1">
                                        <h5 className="fs-14 mb-0">Nom client : {avi.client}</h5>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
