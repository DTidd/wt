#ifndef DATAMODELS_H
#define DATAMODELS_H

#include <Wt/WStandardItemModel>

class SombreroData : public Wt::WStandardItemModel {
public:
  SombreroData(unsigned nbXpts, unsigned nbYpts, Wt::WObject *parent = 0);

  boost::any data(const Wt::WModelIndex& index,
		  int role = Wt::DisplayRole) const;

private:
  const double xStart_, xEnd_, yStart_, yEnd_;
};

class PlaneData : public Wt::WStandardItemModel {
public:
  PlaneData(unsigned nbXpts, unsigned nbYpts, Wt::WObject *parent = 0);

  boost::any data(const Wt::WModelIndex& index,
		  int role = Wt::DisplayRole) const;

private:
  const double xStart_, xEnd_, yStart_, yEnd_;
};


class SpiralData : public Wt::WStandardItemModel {
public:
  SpiralData(unsigned nbPts, Wt::WObject *parent = 0);

  boost::any data(const Wt::WModelIndex& index,
		  int role = Wt::DisplayRole) const;

private:
  unsigned nbPts_;
};

#endif
