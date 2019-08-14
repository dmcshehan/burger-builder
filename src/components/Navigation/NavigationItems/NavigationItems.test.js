import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  it("shoud render navigationItem 2 times when not authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("shoud render navigationItem 3 times when are authenticated", () => {
    wrapper.setProps({
      isAuthenticated: true
    });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should contain Logout Item", () => {
    wrapper.setProps({
      isAuthenticated: true
    });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
