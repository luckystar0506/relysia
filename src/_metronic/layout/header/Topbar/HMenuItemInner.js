import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";

class HMenuItemInner extends React.Component {
  itemCssClassWithBullet(item, parentItem) {
    if (item.bullet) {
      return `kt-menu__link-bullet--${item.bullet}`;
    }

    if (parentItem && parentItem.bullet) {
      return `kt-menu__link-bullet--${parentItem.bullet}`;
    }

    return "";
  }

  render() {
    const { item, parentItem } = this.props;
    return (
      <>
        {/* if menu item has icon */}
        {item.icon && <i className={`kt-menu__link-icon ${item.icon}`} />}

        {/* if menu item using bullet */}
        {!item.icon && (item.bullet || (parentItem && parentItem.bullet)) && (
          <i
            className={`kt-menu__link-bullet ${this.itemCssClassWithBullet(
              item,
              parentItem
            )}`}
          >
            <span />
          </i>
        )}

        {!item.badge ? (
          <>
            <span className="kt-menu__item-here" />
            {/* menu item title text */}
            <span className="kt-menu__link-text">
              <FormattedMessage
                id={`TOPBAR.${item.title}`}
                defaultMessage="{title}"
                values={{ title: item.title }}
              />
            </span>
          </>
        ) : (
          <>
            {/* menu item with badge */}
            <span className="kt-menu__link-text">
              {" "}
              <FormattedMessage
                id={`TOPBAR.${item.title}`}
                defaultMessage="{title}"
                values={{ title: item.title }}
              />
            </span>
            <span className="kt-menu__link-badge">
              <span
                className={`kt-badge kt-badge--brand kt-badge--inline kt-badge--pill ${item.badge.type} `}
              >
                {item.badge.value}
              </span>
            </span>
          </>
        )}
      </>
    );
  }
}

export default injectIntl(HMenuItemInner);
