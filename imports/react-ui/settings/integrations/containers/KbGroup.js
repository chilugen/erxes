import { Meteor } from 'meteor/meteor';
import { Brands } from '/imports/api/brands/brands';
import { KbGroups } from '/imports/api/knowledgebase/collections';
import { compose } from 'react-komposer';
import { getTrackerLoader, composerOptions } from '/imports/react-ui/utils';
import { FORM_LOAD_TYPES, FORM_SUCCESS_ACTIONS } from '/imports/api/integrations/constants';
import { KbGroup } from '../components';
import { saveCallback } from './utils';

const composer = (props, onData) => {
  const brandsHandler = Meteor.subscribe('brands.list', 0);
  const formsHandler = Meteor.subscribe('kbgroups.list');

  const brands = Brands.find().fetch();
  const kbGroups = KbGroups.find().fetch();

  const save = doc => saveCallback(doc, 'addForm', 'editForm', props.integration);

  const loadTypes = Object.values(FORM_LOAD_TYPES);
  loadTypes.splice(-1, 1);

  const successActions = Object.values(FORM_SUCCESS_ACTIONS);
  successActions.splice(-1, 1);

  if (brandsHandler.ready() && formsHandler.ready()) {
    return onData(null, { brands, kbGroups, save, loadTypes, successActions });
  }

  return null;
};

export default compose(getTrackerLoader(composer), composerOptions({ spinner: true }))(KbGroup);
