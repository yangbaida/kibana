import 'plugins/tagcloud/tag_cloud.less';
import 'plugins/tagcloud/tag_cloud_controller';
import 'plugins/tagcloud/tag_cloud_vis_params';
import { VisVisTypeProvider } from 'ui/vis/vis_type';
import { AngularVisTypeProvider } from 'ui/vis/vis_types/angular_vis_type';
import { VisSchemasProvider } from 'ui/vis/schemas';
import tagCloudTemplate from 'plugins/tagcloud/tag_cloud_controller.html';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import image from './images/icon-tagcloud.svg';

VisTypesRegistryProvider.register(function TagCloudProvider(Private) {
  const VisType = Private(VisVisTypeProvider);
  const AngularVisType = Private(AngularVisTypeProvider);
  const Schemas = Private(VisSchemasProvider);

  return new AngularVisType({
    name: 'tagcloud',
    title: 'Tag Cloud',
    image,
    description: 'A group of words, sized according to their importance',
    category: VisType.CATEGORY.OTHER,
    visConfig: {
      defaults: {
        scale: 'linear',
        orientation: 'single',
        minFontSize: 18,
        maxFontSize: 72
      },
      template: tagCloudTemplate,
    },
    editorConfig: {
      collections: {
        scales: ['linear', 'log', 'square root'],
        orientations: ['single', 'right angled', 'multiple'],
      },
      optionsTemplate: '<tagcloud-vis-params></tagcloud-vis-params>',

    },
    schemas: new Schemas([
      {
        group: 'metrics',
        name: 'metric',
        title: 'Tag Size',
        min: 1,
        max: 1,
        aggFilter: ['!std_dev', '!percentiles', '!percentile_ranks', '!derivative'],
        defaults: [
          { schema: 'metric', type: 'count' }
        ]
      },
      {
        group: 'buckets',
        name: 'segment',
        icon: 'fa fa-cloud',
        title: 'Tags',
        min: 1,
        max: 1,
        aggFilter: ['terms']
      }
    ])
  });
});


