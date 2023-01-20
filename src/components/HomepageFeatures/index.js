import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Boilerplate",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: <>Quickly create boilerplate code for your smart contracts.</>,
  },
  {
    title: "Compile",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: <>Compile and debug the contracts.</>,
  },
  {
    title: "Artifacts generation",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: <>Generate compressed compiled files and schema files.</>,
  },
  {
    title: "Deploy",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: <>Generate artifacts and deploy to a network.</>,
  },
  {
    title: "Interact",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: <>Scripting framework for contract interactions.</>,
  },
  {
    title: "Test",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: <>Testing suite integrated.</>,
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
