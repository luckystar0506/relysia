import React from 'react'
import * as Icon from 'react-feather';

const BoxArea = (props) => {
    return (
        <section className="boxes-area">
			<div className="container">
				<div className="row">
					<div className="col-lg-3 col-md-6">
						<div className="single-box">
							<div className="icon">
                                <Icon.Server />
							</div>
							<h3>Zero Configuration</h3>
							<p> With our intuitive user interface, there is no need for any technical configurations on your end. </p>
						</div>
					</div>

					<div className="col-lg-3 col-md-6">
						<div className="single-box bg-f78acb">
							<div className="icon">
                                <Icon.Code />
							</div>
							<h3>Code Security</h3>
							<p>Our system architecture is impenetrable, so that you can build your applications with ease.</p>
						</div>
					</div>

					<div className="col-lg-3 col-md-6">
						<div className="single-box bg-c679e3">
							<div className="icon">
                                <Icon.Database />
							</div>
							<h3>Bitcoin SV</h3>
							<p>Our database services are powered by the expansive capabilities of the Bitcoin SV blockchain.</p>
						</div>
					</div>

					<div className="col-lg-3 col-md-6">
						<div className="single-box bg-eb6b3d">
							<div className="icon">
                                <Icon.GitBranch />
							</div>
							<h3>Access Controlled</h3>
							<p>You can choose how many people have access to your database, in a company or general account. </p>
						</div>
					</div>
				</div>
			</div>
		</section>
    )
}

export default BoxArea
